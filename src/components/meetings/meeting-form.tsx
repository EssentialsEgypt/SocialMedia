import React, { useState } from 'react';

export interface MeetingData {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: Participant[];
  description: string;
  location: string;
  reminderMinutesBefore: number;
  agendaItems: string[];
  attachments: { id: string; name: string; url: string }[];
  createdBy: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
}

interface MeetingFormProps {
  participants: Participant[];
  onSave: (meeting: MeetingData) => Promise<void>;
  initialData?: MeetingData;
  isAdmin: boolean;
}

export default function MeetingForm({ participants, onSave, initialData, isAdmin }: MeetingFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    title: initialData?.title || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    participants: initialData?.participants || [],
    description: initialData?.description || '',
    location: initialData?.location || '',
    reminderMinutesBefore: initialData?.reminderMinutesBefore || 15,
    agendaItems: initialData?.agendaItems || [],
    attachments: initialData?.attachments || [],
    createdBy: initialData?.createdBy || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
          title="Meeting title"
          placeholder="Enter meeting title"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            title="Meeting date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            title="Meeting time"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
          title="Meeting description"
          placeholder="Enter meeting description"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
} 