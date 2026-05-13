import { useState } from "react";
import "./CutModal.css";

// Cut options per product type
const CUT_OPTIONS = {
  Chicken: [
    { id: "curry",    label: "Curry Cut",   grams: 30,  desc: "Small pieces, perfect for curries" },
    { id: "biryani",  label: "Biryani Cut", grams: 70,  desc: "Medium pieces, ideal for biryani" },
    { id: "boneless", label: "Boneless",    grams: 50,  desc: "No bones, cleaned & trimmed" },
    { id: "full",     label: "Full Bird",   grams: null, desc: "Whole chicken, uncut" },
  ],
  // Add more product types here later
};

function CutModal({ product, onClose, onAdd }) {
  const cuts = CUT_OPTIONS[product.name] || null;

  // If no cuts for this product (eggs, pickles) — just add directly
  // This case is handled in Home.jsx before opening modal

  const [selectedCut, setSelectedCut] = useState(cuts ? cuts[0].id : null);

  const handleAdd = () => {
    const cut = cuts.find((c) => c.id === selectedCut);
    onAdd({
      ...product,
      p_id: product.p_id || product.id,  // Ensure p_id exists
      cut: cut.label,
      weight: cut.grams ? `${cut.grams}g pieces` : "Whole",
    });
    onClose();
  };

  return (
    // Clicking the dark backdrop closes the modal
    <div className="modal-backdrop" onClick={onClose}>

      {/* stopPropagation prevents closing when clicking inside */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Select Cut Size</p>
            <h2 className="modal-title">{product.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-cuts">
          {cuts.map((cut) => (
            <button
              key={cut.id}
              className={`cut-option ${selectedCut === cut.id ? "cut-option--selected" : ""}`}
              onClick={() => setSelectedCut(cut.id)}
            >
              <div className="cut-option-top">
                <span className="cut-name">{cut.label}</span>
                {cut.grams && (
                  <span className="cut-grams">~{cut.grams}g pieces</span>
                )}
              </div>
              <p className="cut-desc">{cut.desc}</p>
            </button>
          ))}
        </div>

        <div className="modal-footer">
          <div className="modal-price">
            <span className="modal-price-label">Price / kg</span>
            <span className="modal-price-val">₹{product.price}</span>
          </div>
          <button className="modal-add-btn" onClick={handleAdd}>
            Add to Cart →
          </button>
        </div>
      </div>
    </div>
  );
}

export default CutModal;