# makes sure there is a chromium 
# todo

# finds all .flow.yml files and runs `maestro test` against them
find . -name "*.flow.yml" -exec maestro test {} \;