function getOutput(command){
  var text=""; 
  switch(command){

    case "whoami": 
      text =  "<p><pre>Hello there, Iam Dayanand aka Djd.</pre></p>";
    text += "<p><pre>Iam a web developer, currently working on Ruby on Rails. Javascript and Linux are my other interests </pre></p>";
    text += "<p><pre>I also love Travelling and reading about History and Travel</pre></p>";
    text += "<p><pre>Currently living in India,Bangalore</pre></p>";
    break

    case "contact":
      text = "<p><pre>You can mail me at djd4rce(at)gmail.com</pre></p>";
    break

    case "help":
    text =  "<p><pre>whoami                   Prints info about me</pre></p>";
    text += "<p><pre>shoutouts                  People who helped me in making this page</pre></p>"; 
    text += "<p><pre>blog/twitter/github      type one of the sites to go to those pages</pre></p>";
    text += "<p><pre>contact                    Prints my email</pre></p>";
    text += "<p><pre>clear                    Clears the output console</pre></p>";
    break

    case "shoutouts":
    text =  "<p><pre>Devadutta Ghat           For the original UI</pre></p>";
    text += "<p><pre>Sandeep                  For the inspirations</pre></p>"; 
    text += "<p><pre>Vineet(Gampa)            For the laptop</pre></p>";
    text += "<p><pre>Pai Suhas                For always being there</pre></p>";
    break

    case "blog":
    text = "<p><pre>New tab open with http://djds4rce.wordpress.com</pre></p>";
    break

    
    case "twitter":
    text = "<p><pre>New tab open with http://twitter.com/notsosleepy </pre></p>";
    break

    case "github":
    text = "<p><pre>New tab open with http://github.com/djds4rce </pre></p>";
    break
     
    default:
      text= "<p><pre>Command Not found</pre></p>";

  }
  return text;
}
