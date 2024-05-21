using System.Diagnostics.Metrics;

namespace Tweets.api.Monitoring
{
    public static class DiagnosticsConfig
    {
        public const string ServiceName = "Tweets";

        public static Meter Meter = new Meter(ServiceName);

        public static Counter<int> TweetsCounter = Meter.CreateCounter<int>("tweets.count");
    }
}
