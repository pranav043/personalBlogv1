const express = require('express')
const ejs = require('ejs')
const port = process.env.PORT || 3000

const _ = require('lodash')

const homeStartingContent =
  'Welcome to Personal Blog WebApp. This app is created by Pranav Gupta. You can find the source code here: '
const aboutContent =
  'This WebApp uses NodeJS, ExpressJS, EJS, HTML, CSS, Lodash'
const contactContent = 'You can contact me via Github, LinkedIn, or Email'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const posts = []

app.get('/', (req, res) => {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    posts: posts,
    _: _,
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent,
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent,
  })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const post = {
    newTitle: req.body.blogNewTitle,
    newContent: req.body.blogNewContent,
  }

  posts.push(post)
  res.redirect('/')
})

app.get('/posts/:title', (req, res) => {
  let urlTitle = _.lowerCase(req.params.title)

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.newTitle)
    if (urlTitle === storedTitle) {
      res.render('post', {
        newTitle: post.newTitle,
        newContent: post.newContent,
      })
      // } else
      //   res.render('post', {
      //     newTitle: 'Post Not Found',
      //     newContent: 'Please make sure post is created & spelling is correct ',
    }
  })
})

app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})
