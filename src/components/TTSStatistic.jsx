import { useEffect, useState } from "react";
import "../ttsStatistic.scss";

const TTSStatistic = () => {
  const [globalStats, setGlobalStats] = useState(null);
  const [languageStats, setLanguageStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const globalResponse = await fetch(
          "https://texttospeech-i1nd.onrender.com/api/Statistics/global-statistic"
        );
        const globalData = await globalResponse.json();

        const languageResponse = await fetch(
          "https://texttospeech-i1nd.onrender.com/api/Statistics/language-statistic"
        );
        const languageData = await languageResponse.json();

        setGlobalStats(globalData.data);
        setLanguageStats(languageData.data.languages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!globalStats || !languageStats) {
    return <div>Failed to load statistics. Please try again later.</div>;
  }

  return (
    <div className="tts-statistic-page">
      <div className="divider" />
      <section className="global-stats">
        <div className="center-title" style={{ marginBottom: "0.5rem" }}>
          <span>Global Statistics</span>
        </div>
        <div className="stats-container">
          <ul className="first-ul">
            <li>
              Total Requests:{" "}
              <span>{globalStats.globalTotalRequests} times</span>
            </li>
            <li>
              Total Duration:{" "}
              <span>{globalStats.globalTotalDuration.toFixed(2)} s</span>
            </li>
            <li>
              Average Duration per Request:{" "}
              <span>{globalStats.globalTotalAverageDuration.toFixed(2)} s</span>
            </li>
            <li>
              Total Sentences:{" "}
              <span>{globalStats.globalTotalSentences} lines</span>
            </li>
            <li>
              Average Duration per Sentence:{" "}
              <span>
                {globalStats.globalAverageDurationPerSentences.toFixed(2)} s
              </span>
            </li>
          </ul>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Tone Type Counts
          </div>
          <ul className="bar-graph">
            {Object.entries(globalStats.globalToneTypeCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([tone, count]) => (
                <li key={tone}>
                  <div className="bar-wrap">
                    <div className="bar-first">
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </div>
                    <div
                      className="bar-second"
                      style={{
                        width:
                          (count / globalStats.globalTotalRequests) * 100 + "%",
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <div className="divider" />
      <section className="language-stats">
        <div className="center-title" style={{ marginTop: "0.5rem" }}>
          <span>Language Statistics</span>
        </div>
        <div className="language-grid">
          {Object.entries(languageStats)
            .sort((a, b) => b[1].langTotalRequest - a[1].langTotalRequest)
            .map(([language, stats]) => (
              <div key={language} className="language-card">
                <div className="language-name">{language.toUpperCase()}</div>
                <ul>
                  <li>Total Requests: {stats.langTotalRequest} time(s)</li>
                  <li>Total Duration: {stats.langTotalDuration.toFixed(2)}s</li>
                  <li>
                    Avg Duration per Request:{" "}
                    {stats.langAverageDuration.toFixed(2)}s
                  </li>
                  <li>
                    Avg Sentences Per Request:{" "}
                    {(
                      stats.langTotalSentences / stats.langTotalRequest
                    ).toFixed(2)}{" "}
                    lines
                  </li>
                </ul>
                <ul className="bar-graph">
                  {Object.entries(stats.langToneTypeCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([tone, count]) => (
                      <li key={tone}>
                        <div className="bar-wrap">
                          <div className="bar-first">
                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                          </div>
                          <div
                            className="bar-second"
                            style={{
                              width:
                                (count / stats.langTotalRequest) * 100 + "%",
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

{
  /* {Object.entries(languageStats).map(([language, stats]) => (
          <div key={language} className="language-card">
            <h3>{language.toUpperCase()}</h3>
            <ul>
              <li>Total Requests: {stats.langTotalRequest}</li>
              <li>Total Duration: {stats.langTotalDuration.toFixed(2)}s</li>
              <li>
                Average Duration per Request:{" "}
                {stats.langAverageDuration.toFixed(2)}s
              </li>
              <li>Total Sentences: {stats.langTotalSentences}</li>
              <li>
                Average Duration per Sentence:{" "}
                {stats.langAverageDurationPerSentences.toFixed(2)}s
              </li>
              <li>
                Tone Type Counts:
                <ul>
                  {Object.entries(stats.langToneTypeCounts).map(
                    ([tone, count]) => (
                      <li key={tone}>
                        {tone}: {count}
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </div>
        ))} */
}

export default TTSStatistic;
