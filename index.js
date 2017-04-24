class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
    }
    this.getQuote = this.getQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }
  componentDidMount () {
    this.getQuote();
  }
  getQuote() {
    var output = $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
      type: 'GET',
      data: {cat: "famous"},
      dataType: 'json',
      success: (data) => {
      this.setState(
        {quote: data.quote,
        author: data.author}
      )},
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "Bs3v3FfQAwmshegU6GrNcEQhuVM8p1tHSQ7jsnYm0ekx0fS8GJ");
      }
  });
  }
  tweetQuote() {
    var quote = this.state.quote;
    var author = this.state.author;
    var url = "http://twitter.com/home?status=" + quote + "%0a%0a" + author;
    window.open(url,"name=_blank","height=250,width=500");
  }
  render () {
    return (
    <div className="card-block">
    <QuoteBox quote={this.state.quote} author={this.state.author} />
        <br />
    <QuoteButton get={this.getQuote} />
    <TweetButton tweet={this.tweetQuote} />
    </div>
    )
  }
};

var QuoteButton = (props) => {
  return (
  <button className="btn btn-secondary" onClick={props.get}>
      Get a Quote
  </button>
  );
};

var TweetButton = (props) => {
  return (
  <button className="btn btn-primary" onClick={props.tweet}>
      Tweet it!
  </button>
  );
};

var QuoteBox = (props) => {
  return (
    <div>
      <blockquote>
        {props.quote}
      </blockquote>
      <cite>
        {props.author}
      </cite>
    </div>
 );
};

ReactDOM.render(<RandomQuote />,
               document.getElementById('quote'));
