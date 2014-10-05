require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"
require "jekyll-assets"


# Change your GitHub reponame
GITHUB_REPONAME = "petemcw/petemcw.github.com"


desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => "_source",
    "destination" => "_site",
    "config"      => "_config.yml"
  })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp
    cp_r "CNAME", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end

