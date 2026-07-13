import React from 'react';

const WEEKDAYS = [
  { label: 'Mon', key: '2026-02-04' },
  { label: 'Tue', key: '2026-02-05' },
  { label: 'Wed', key: '2026-02-06' },
  { label: 'Thu', key: '2026-02-07' },
  { label: 'Fri', key: '2026-02-08' },
  { label: 'Sat', key: '2026-02-09' },
  { label: 'Sun', key: '2026-02-10' },
];

export default function HabitTable({ habits, onToggleComplete, onDelete }) {
  return (
    <div className="habit-matrix-view">
      <div className="matrix-header">
        <div className="matrix-nav-controls">
          <button className="icon-btn">‹</button>
          <button className="icon-btn">›</button>
          <span className="matrix-date-range">Mon, 2/4 - Sun, 2/10</span>
        </div>
        <div className="matrix-view-toggles">
          <button className="toggle-btn active">≡</button>
          <button className="toggle-btn">::: </button>
        </div>
      </div>

      <div className="matrix-subhead">
        <div className="trend-badge">
          <span className="up-arrow">↑</span> Up 23% from week before
        </div>
        <div className="achieved-label">27% achieved</div>
      </div>

      <div className="matrix-grid">
        <div className="grid-header-row">
          <div className="col-habit-title"></div>
          {WEEKDAYS.map((d) => (
            <div key={d.key} className="col-day-header">{d.label}</div>
          ))}
          <div className="col-summary"></div>
        </div>

        {habits.map((habit) => {
          const completedCount = WEEKDAYS.filter((d) => habit.logs?.[d.key]).length;

          return (
            <div key={habit._id} className="grid-habit-row">
              <div className="col-habit-title">
                <span 
                  className={`habit-type-icon ${habit.isNegative ? 'cross' : 'dot'}`}
                  style={{ color: habit.color, backgroundColor: habit.isNegative ? 'transparent' : habit.color }}
                >
                  {habit.isNegative ? '✕' : ''}
                </span>
                <span className="habit-label-text">{habit.habitName}</span>
              </div>

              {WEEKDAYS.map((d) => {
                const isChecked = !!habit.logs?.[d.key];
                return (
                  <div key={d.key} className="col-day-cell">
                    <button
                      className={`grid-cell-block ${isChecked ? 'filled' : 'empty'}`}
                      style={{
                        backgroundColor: isChecked ? habit.color : '#eef2f6'
                      }}
                      onClick={() => onToggleComplete(habit._id, d.key)}
                    />
                  </div>
                );
              })}

              <div className="col-summary">
                <span className="score-text">{completedCount}/{habit.targetDays}</span>
                <button className="delete-habit-btn" onClick={() => onDelete(habit._id)} title="Delete habit">✕</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}