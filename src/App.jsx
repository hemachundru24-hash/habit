
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { api } from './api';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState('2026-02-18');

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const data = await api.getHabits();
    setHabits(data);
  };

  const handleAddHabit = async (habitName, color, targetDays, isNegative) => {
    await api.addHabit(habitName, color, targetDays, isNegative);
    loadHabits();
  };

  const handleToggleComplete = async (id, dateStr) => {
    const updated = await api.toggleComplete(id, dateStr);
    setHabits(updated);
  };

  const handleDeleteHabit = async (id) => {
    const updated = await api.deleteHabit(id);
    setHabits(updated);
  };

  return (
    <div className="app-viewport">
      <div className="app-card">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-stage">
          <Dashboard 
            habits={habits}
            onAddHabit={handleAddHabit}
            onToggleComplete={handleToggleComplete}
            onDeleteHabit={handleDeleteHabit}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </main>
      </div>
    </div>
  );
}