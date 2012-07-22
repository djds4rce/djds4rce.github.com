function getOutput(command){
  var text=""; 
  switch(command){

    case "whoami": 
      text =  "<p><pre>Hello there, Iam Dayanand aka Djd.</pre></p>";
      text += "<p><pre>Iam a web developer, currently working on Ruby on Rails. Javascript and Linux  are my other interests </pre></p>";
      text += "<p><pre>I also love Travelling and reading about History and Travel</pre></p>";
      text += "<p><pre> Currently living in India,Bangalore</pre></p>";
    break

    case "contact":
      text = "<p><pre>You can mail me at djd4rce(at)gmail.com</pre></p>";
    break

    case "help":
      text =  "<p><pre>whoami                   Prints info about me</pre></p>";
      text += "<p><pre>credits                  People who helped me in making this page</pre></p>"; 
      text += "<p><pre>blog/twitter/github      type one of the sites to go to those pages</pre></p>";
      text += "<p><pre>email                    Prints my email</pre></p>";
      text += "<p><pre>clear                    Clears the output console</pre></p>";
    break


    default:
      text= "<p><pre>Command Not found</pre></p>";

  }
  return text;
}
