var key;
$.ajax({
  url: "/config.json",
  success: function ( data ) { 
    key = data.key },
  error: function ( error ) { console.log(error); }
})


var Entry = React.createClass({
  render: function() {
    return (
      <div className="entry">
        <p>{this.props.children}</p>
      </div>
    )
  }
})

var Board = React.createClass({
  getInitialState: function(){
    return {
      entries: []
    };
  },

  submit: function(e){
    e.preventDefault();
    var that = this;
    var input = $('#word-input').val();
    $.ajax({
      url:     'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + input,
      headers: {'X-Mashape-Key': key},
      error:   function(e) {console.log(e)},
      success: function(data) {
        var definitionArray = [];
        for ( var i = 0; i < data.list.length; i++ ) {
          var entry = data.list[i].definition;
          definitionArray.push(entry);
        }
        that.setState({ entries: definitionArray })
      }
    })

  },

  eachEntry: function(entry, i) {
    return (
      <Entry key={i}>{entry}</Entry>
    )
  },

  render: function() {
    var input   = $('#word-input').val();
    var message = input ? 'Showing results for "' + input + '"' : ""

    return (
      <div className="board">
        <h1>Choose a word to search on urban dictionary:</h1>
        <form className="word-input-form" onSubmit={this.submit}>
          <input type="text" id="word-input" />
          <input type="submit" />
        </form>
        <h2>{message}</h2>
        <div>
          {this.state.entries.map(this.eachEntry)}
        </div>
      </div>
    )
  },
})

React.render(
  <Board></Board>, 
  document.getElementById('board')
);






