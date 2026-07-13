
import React, { useState } from 'react';

const PALETTE = ['#f59e0b', '#a855f7', '#06b6d4', '#f97316', '#0284c7', '#22c55e'];

export default function AddHabit({ onAdd, onClose }) {
  const [habitName, setHabitName] = useState('');
  const [color, setColor] = useState(PALETTE[0]);
  const [targetDays, setTargetDays] = useState(7);
  const [isNegative, setIsNegative] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    onAdd(habitName, color, targetDays, isNegative);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>+ Add Habit</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="field-group">
            <label>Habit Name</label>
            <input 
              type="text" 
              placeholder="e.g. Read, Workout, Meditate"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="field-group">
            <label>Color Tag</label>
            <div className="color-options">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label>Target Days / Week</label>
              <input 
                type="number" 
                min="1" 
                max="7"
                value={targetDays} 
                onChange={(e) => setTargetDays(e.target.value)}
              />
            </div>

            <div className="field-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={isNegative} 
                  onChange={(e) => setIsNegative(e.target.checked)}
                />
                Avoidance Habit (✕)
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">+ Add Habit</button>
          </div>
        </form>
      </div>
    </div>
  );
}