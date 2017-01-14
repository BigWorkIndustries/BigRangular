# https://github.com/tpitale/staccato
$Tracker = Staccato.tracker(Rails.configuration.x.private[:services][:analytics][:tracking_id])

# Events