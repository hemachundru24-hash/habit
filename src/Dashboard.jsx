
import React, { useState } from 'react';
import HabitTable from './HabitTable';
import AddHabit from './AddHabit';

export default function Dashboard({ habits, onAddHabit, onToggleComplete, onDeleteHabit, selectedDate, setSelectedDate }) {
  const [activeRange, setActiveRange] = useState('Week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Daily status calculations
  const totalDaily = habits.length;
  const completedDaily = habits.filter(h => !!h.logs?.[selectedDate]).length;
  const dailyPercentage = totalDaily > 0 ? Math.round((completedDaily / totalDaily) * 100) : 0;

  return (
    <div className="dashboard-container">
      {/* Top Welcome Bar */}
      <div className="dashboard-top-bar">
        <div className="greeting-box">
          <h1>Hey there, Hailey</h1>
          <p className="bedtime-subtitle">5 hrs 42 mins till bedtime</p>
        </div>

        <div className="daily-progress-widget">
          <div className="widget-header">
            <span className="widget-date-title">Mon, Feb 18</span>
            <div className="widget-arrows">
              <button className="arrow-btn">‹</button>
              <button className="arrow-btn">›</button>
            </div>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${dailyPercentage}%` }}></div>
          </div>
          <span className="progress-percentage-label">{dailyPercentage}% of daily goal achieved</span>
        </div>
      </div>

      {/* Main Content Layout (Split Left Matrix / Right Daily Checklist) */}
      <div className="dashboard-layout">
        {/* Left Section */}
        <section className="left-panel">
          <div className="controls-row">
            <div className="pill-tabs">
              {['Week', 'Month', 'Year', 'All Time'].map(tab => (
                <button
                  key={tab}
                  className={`pill-tab ${activeRange === tab ? 'active' : ''}`}
                  onClick={() => setActiveRange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button className="add-habit-btn" onClick={() => setIsModalOpen(true)}>
              + Add Habit
            </button>
          </div>

          <HabitTable 
            habits={habits}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteHabit}
          />
        </section>

        {/* Right Section: Daily Checklist Cards */}
        <section className="right-panel">
          <div className="daily-cards-list">
            {habits.map((habit) => {
              const isDone = !!habit.logs?.[selectedDate];

              return (
                <div 
                  key={habit._id} 
                  className={`habit-card ${isDone ? 'card-completed' : 'card-pending'}`}
                  style={{
                    backgroundColor: isDone ? habit.color : '#ffffff',
                    borderLeft: isDone ? 'none' : `4px solid ${habit.color}`
                  }}
                >
                  <div className="card-top-row">
                    <span className="card-title">{habit.habitName}</span>
                    <button className="more-options-btn">⋮</button>
                  </div>

                  <div className="card-bottom-row">
                    {isDone ? (
                      <>
                        <span className="completed-badge">✓ Completed</span>
                        <button 
                          className="undo-btn"
                          onClick={() => onToggleComplete(habit._id, selectedDate)}
                        >
                          Undo
                        </button>
                      </>
                    ) : (
                      <button 
                        className="mark-complete-btn"
                        onClick={() => onToggleComplete(habit._id, selectedDate)}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {isModalOpen && (
        <AddHabit 
          onAdd={onAddHabit} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}