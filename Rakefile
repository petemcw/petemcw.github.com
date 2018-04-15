require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'
require 'shellwords'

desc "Generate site files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "destination" => "_site",
    "config"      => "_config.yml"
  })).process
end

desc "Generate and publish site"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    system "mv _site/* #{tmp}"
    system "git checkout -B master"
    system "rm -rf *"
    system "mv #{tmp}/* ."
    message = "Site updated at #{Time.now.utc}"
    system "git add ."
    system "git commit -am #{message.shellescape}"
    system "git push -u origin master --force"
    system "git checkout source"
    system "echo yolo"
  end
end

task :default => :publish
