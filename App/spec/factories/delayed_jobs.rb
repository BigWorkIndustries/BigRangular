FactoryGirl.define do
  factory :delayed_job do
    priority 1
    attempts 1
    handler 'widget'
    last_error null
    run_at DateTime.now
    locked_at null
    failed_at null
    locked_by SecureRandom.hex(16)
    queue 'default'

  end
end
