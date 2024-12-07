import React, { useEffect, useState } from "react";

function App() {
  const [contentVisible, setContentVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(null); // Track which dropdown is visible
  const [selectedHeader, setSelectedHeader] = useState(null); // Track the selected header for EXTRA-ISR
  const [iframeSrc, setIframeSrc] = useState(null); // Track the iframe source for embedded content
  const [buttonVisibility, setButtonVisibility] = useState({}); // Track visibility of each button
  const [paragraphVisible, setParagraphVisible] = useState(false); // Track visibility of paragraph

  useEffect(() => {
    const headingTimer = setTimeout(() => setHeadingVisible(true), 1000); // 1-second delay
    const contentTimer = setTimeout(() => setContentVisible(true), 500); // 0.5-second delay

    // Sequential fade-in of buttons
    const buttons = Object.keys(dropdownData);
    buttons.forEach((key, index) => {
      setTimeout(() => {
        setButtonVisibility((prev) => ({ ...prev, [key]: true }));
        if (index === buttons.length - 1) {
          // Trigger paragraph visibility after the last button fades in
          setTimeout(() => setParagraphVisible(true), 300);
        }
      }, index * 300); // Staggered delay (300ms between buttons)
    });

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const bodyStyle = {
    opacity: contentVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const headingStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "2px 2px 5px black",
    opacity: headingVisible ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    zIndex: 1,
    margin: "0",
  };

  const paragraphStyle = {
    opacity: paragraphVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const dropdownData = {
    THEORY: [
      { label: "T.1: Thomson Scattering", link: "https://en.wikipedia.org/wiki/Thomson_scattering" },
      { label: "T.2: Fluctuation-Dissipation Approach", link: "https://en.wikipedia.org/wiki/Fluctuation-dissipation_theorem" },
      { label: "T.3: Dressed Particle Approach", link: "https://en.wikipedia.org/wiki/Dressed_particle" },
      { label: "T.4: Plasma Kinetic Approach", link: "https://en.wikipedia.org/wiki/Plasma_modeling" },
      { label: "T.5: Features of ISR Spectra", link: "https://en.wikipedia.org/wiki/Incoherent_scatter" },
    ],
    OBSERVATION: [
      { label: "O.1: Standard Madrigal Outputs", link: "https://en.wikipedia.org/wiki/Haystack_Observatory" },
      { label: "O.2: Instabilities", link: "https://en.wikipedia.org/wiki/Incoherent_scatter" },
      { label: "O.3: Effects of Photoelectron", link: "https://simple.wikipedia.org/wiki/Photoelectric_effect" },
      { label: "O.4: Effects of Collisions", link: "https://en.wikipedia.org/wiki/Collision" },
      { label: "O.5: Observation Techniques", link: "#" },
    ],
    EXPERIMENT: [
      { label: "E.1: Overview of Existing Radars", link: "https://en.wikipedia.org/wiki/List_of_radars" },
      { label: "E.2: Basic Experimental Setup", link: "#" },
      { label: "E.3: Signal Processing", link: "https://en.wikipedia.org/wiki/Signal_processing" },
      { label: "E.4: Fitting Spectra", link: "https://en.wikipedia.org/wiki/Spectral_line_shape" },
      { label: "E.5: Experiment Analysis", link: "#" },
    ],
    JUPYTER_NOTEBOOK: [
      { label: "J.1: Jupyter Testing", link: "https://nbviewer.org/github/DredgenYors/JupyterNotebookTesting/blob/main/JupyterTesting.ipynb" },
      { label: "J.2: Test PDF", link: "/test.pdf" },
      { label: "J.3: Examples", link: "#" },
    ],
    SIMULATION: [
      { label: "S.1: Simulation Setup", link: "#" },
      { label: "S.2: Results Analysis", link: "#" },
      { label: "S.3: Advanced Techniques", link: "#" },
    ],
  };

  return (
    <div style={bodyStyle}>
      <div style={{ position: "relative", textAlign: "center", height: "200px" }}>
        {/* Navigation Buttons */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            zIndex: 2,
          }}
        >
          {Object.keys(dropdownData).map((key) => (
            <div
              key={key}
              style={{
                position: "relative",
                opacity: buttonVisibility[key] ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              onMouseEnter={() => setVisibleDropdown(key)}
              onMouseLeave={() => setVisibleDropdown(null)}
            >
              <button
                style={{
                  padding: "10px 15px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setSelectedHeader(key)} // Update the EXTRA-ISR section
              >
                {key.replace("_", " ")} {/* Replace underscores in keys with spaces */}
              </button>
              {/* Dropdown Menu */}
              {visibleDropdown === key && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%", // Center the dropdown
                    transform: "translateX(-50%)", // Adjust the position to center-align
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    padding: "10px",
                    borderRadius: "5px",
                    zIndex: 3,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                    minWidth: "150px",
                  }}
                >
                  {dropdownData[key].map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank" // Open in a new window
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        color: "white",
                        textDecoration: "none",
                        padding: "5px 10px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <img
          src={require("./assets/isrbuildingheader.jpg")}
          alt="ISR-Ban"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
        <h1 style={headingStyle}>New Jersey Institute of Technology Radar Collective</h1>
      </div>

      {/* Main ISR Section */}
      <div id="MAIN-ISR-PAGE">
        {/* Upper ISR Section */}
        <div
          className="UPPER-ISR"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100px",
            textAlign: "center",
            margin: "0 auto",
            maxWidth: "1650px",
            padding: "5px",
            boxSizing: "border-box",
            ...paragraphStyle, // Apply fade-in style
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "1.25rem",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              fontWeight: "500",
              lineHeight: "1.6",
            }}
          >
            The goal of this website is to be a contemporary, online “textbook”
            for Incoherent Scatter Radars. We have constructed the chapters of
            this textbook to be as stand-alone as possible, with required
            dependencies listed at the start of each chapter so that readers
            can explore the material in an order that best suits their needs.
            Each chapter contains Jupyter Notebooks to illustrate the concepts,
            and provides basic Python code for use in research.
          </p>
        </div>

        {/* Extra ISR Section */}
        <div
          className="EXTRA-ISR"
          style={{
            marginTop: "20px",
            textAlign: "center",
            paddingBottom: iframeSrc ? "25px" : "0px", // Add 400px padding if iframeSrc exists
          }}
        >
          {selectedHeader && (
            <div>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {selectedHeader.replace("_", " ")}
              </h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {dropdownData[selectedHeader].map((item, index) => (
                  <li key={index} style={{ margin: "5px 0" }}>
                    <a
                      href="#"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        fontWeight: "500",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIframeSrc(item.link); // Set iframe source
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {iframeSrc && (
                <iframe
                  src={iframeSrc}
                  title="Embedded Content"
                  style={{
                    width: "95%",
                    height: "850px",
                    border: "1px solid #ccc",
                    marginTop: "20px",
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
