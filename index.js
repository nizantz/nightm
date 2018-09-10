/* eslint-disable no-console */
// Invoking the nightmare module below
require('dotenv').config()
const Nightmare = require('nightmare')
// setting an instance of the headless browser
// but setting it to non-headless mode
var nightmare = Nightmare({ show: true })

// Invoking the  browser instance
// 1. loading the url in the browser
//
nightmare
// 1. loading the URL in the browser
// The URL is for the user's Information page
  .goto(
    'https://www.facebook.com/dyi/?x=AdlWLSmibzAahJJL&referrer=yfi_settings&tab=new_archive'
  )
// This above step invokes login page
// The below two steps logs in the user
  .type('#email', process.env.FB_USERNAME)
  .type('#pass', process.env.FB_PASSWORD)
  // .click('[type=submit]')
  // The step below performs a submit or click of login button
  .click('#loginbutton')
  // wait for 3 secs for page to load
  .wait(3000)
  // from teh page loaded find out the URL for "Download Your Information> New File page"
  .evaluate(function() {
    return document.querySelector(
      '[data-testid="settings_section_download_your_information"]'
    ).firstElementChild.href
  })
  // on successful completion of step above
  // goto the URL. Wait 5s for page to load and
  // click on teh button to create the file (default params)
  .then(function(result) {
    console.log(result)
    return nightmare.goto(result)
    // return nightmare.goto(result).wait(5000).click("[data-testid='dyi/sections/create']").wait(5000)
  })
  .catch(function(error) {
    console.error('Search failed:', error)
  })
