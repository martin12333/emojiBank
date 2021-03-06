import React from "react";

var Emoji = React.createClass({
  select: function(event) {
    $('.msg').addClass('hidden');
    $('.selected').removeClass('selected');
    $('.deleteButton').addClass('hidden');
    if(event.target.tagName === 'INPUT') {
      $(event.target).select();
      var div = $(event.target).parent();
      var msg = $(div).children()[1];
      var deleteButton = $(div).children()[2];
      $(msg).removeClass('hidden');
      $(div).addClass('selected');
      $(deleteButton).removeClass('hidden');
    } else {
        $($(event.target).children()[0]).select();
        var msg = $(event.target).children()[1];
        var deleteButton = $(event.target).children()[2];
        $(msg).removeClass('hidden');
        $(event.target).addClass('selected');
        $(deleteButton).removeClass('hidden');
      }
    if(event.target.tagName === 'BUTTON') {
      var div = $(event.target).parent();
      $(div).addClass('selected');
    }
  },

  showDelete: function(event) {
    var deleteButton = $(event.target).children()[2];
    $(deleteButton).removeClass('hidden');
  },

  hideDelete: function(event) {
    var deleteButton = $(event.target).children()[2];
    $(deleteButton).addClass('hidden');
  },

  confirmDelete: function(event) {
    var div = $(event.target).parent();
    $(div).addClass('selected');
    var emojiInput = $(event.target).parent().children()[0];
    var emoji = $(emojiInput).val();
    var confirmPanel = $(event.target).parent().children()[3];
    $(confirmPanel).removeClass('hidden');
  },

  deleteEmoji: function(event) {
    var emojiInput = $(event.target).parent().parent().children()[0];
    var emoji = $(emojiInput).val();
    //console.log(emoji);

    //delete emoji from localStorage
    var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
    delete emojiObj[emoji];
    window.localStorage.setItem('emojis', JSON.stringify(emojiObj));
    this.props.data.changeEmojis();

    var confirmPanel = $(event.target).parent();
    $(confirmPanel).addClass('hidden');
  },

  cancelDelete: function(event) {
    var confirmPanel = $(event.target).parent();
    $(confirmPanel).addClass('hidden');
  },

  render: function() {
    return (
      <li className="emoji" key={this.props.key} onClick={this.select}>
        <input key={this.props.key} onClick={this.select} value={this.props.data.emoji} readOnly></input>
        <div className="msg hidden"><span>cmd/ctrl + c!</span>
        </div>
        <button onClick={this.confirmDelete} className="deleteButton hidden">Delete?</button>
        <div className="confirm hidden">
          <p className="confirmmsg">are you sure?</p>
          <button onClick={this.deleteEmoji}>yes</button>
          <button onClick={this.cancelDelete}>no</button>
        </div>
      </li>
    );
  }
});

export default React.createClass({
  getInitialState: function() {
    return { emojis: this.emojis };
  },

  render: function() {
    var changeEmojis = this.props.data.changeEmojis;
    var emojis = this.props.data.emojis.map(function(emoji) {
      var data = { emoji: emoji, changeEmojis: changeEmojis }
      return (
        <Emoji data={data} />
      );
    });

    return (
      <ul>
      {emojis}
      </ul>
    );
  }
});

