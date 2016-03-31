source 'https://rubygems.org'

require 'json'
require 'open-uri'

versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

# for thumbnails
# don't forget to 'apt-get install graphicsmagick'
gem 'therubyracer'
gem 'jekyll-minimagick'

