Rails.logger.info '***RESTART***'

config = Rails.configuration

config.x.private[:urls] = {}
config.x.private[:urls][:target] = 'https://www.google.com'

### COMMON ###
config.x.public[:env] = Rails.env

### OAUTH ###
config.x.public[:services][:oauth][:uid] = ENV['OAUTH_UID'] || '02990a75adf79008d0cdcc0890ab78834c9199b23c9b6101638f826c6fcc6a42'
config.x.private[:services][:oauth][:secret] = ENV['OAUTH_SECRET'] || 'cfd167ba0cfcf7d1605ba6a89212d1150f3bc26730863c927a0660df20517424'