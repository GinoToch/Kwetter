using System.Diagnostics.Metrics;

namespace Tweets.api.Monitoring
{
    public static class DiagnosticsConfig
    {
        public const string ServiceName = "Tweets";

        public static Meter Meter = new Meter(ServiceName);
    }
}
