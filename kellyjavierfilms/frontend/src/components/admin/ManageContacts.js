import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './ManageContacts.css';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('new');
  const [selectedContact, setSelectedContact] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/contact?status=${filter}`);
      setContacts(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await api.put(`/contact/${contactId}`, 
        { status: 'read' }
      );
      fetchContacts();
    } catch (err) {
      setError('Failed to update contact');
      console.error('Error:', err);
    }
  };

  const handleAddNotes = async (contactId) => {
    try {
      await api.put(`/contact/${contactId}`, 
        { notes }
      );
      setNotes('');
      setSelectedContact(null);
      fetchContacts();
      alert('Notes added successfully');
    } catch (err) {
      setError('Failed to add notes');
      console.error('Error:', err);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact/${contactId}`);
        fetchContacts();
        setSelectedContact(null);
        alert('Message deleted successfully');
      } catch (err) {
        setError('Failed to delete message');
        console.error('Error:', err);
      }
    }
  };

  return (
    <div className="manage-contacts">
      <div className="contacts-header">
        <h2>💬 Messages & Inquiries</h2>
        <div className="filter-controls">
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setSelectedContact(null); }} className="filter-select">
            <option value="new">New Messages</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="">All Messages</option>
          </select>
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="contacts-layout">
        <div className="contacts-list-section">
          {loading ? (
            <div className="loading">Loading messages...</div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <p>📭 No messages found</p>
            </div>
          ) : (
            <div className="contacts-list">
              {contacts.map(contact => (
                <div
                  key={contact._id}
                  className={`contact-item ${selectedContact?._id === contact._id ? 'active' : ''} ${contact.status === 'new' ? 'unread' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="contact-summary">
                    <div className="contact-meta">
                      <h4>{contact.name}</h4>
                      <p className="contact-type">{contact.type}</p>
                    </div>
                    <div className="contact-preview">{contact.subject}</div>
                    <div className="contact-date">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {contact.status === 'new' && <div className="unread-badge">NEW</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="contact-detail-section">
          {selectedContact ? (
            <div className="contact-detail">
              <div className="detail-header">
                <div>
                  <h3>{selectedContact.name}</h3>
                  <p className="detail-email">{selectedContact.email}</p>
                  {selectedContact.phone && <p className="detail-phone">{selectedContact.phone}</p>}
                </div>
                <div className="detail-badge" style={{
                  background: selectedContact.status === 'new' ? '#ff9800' : selectedContact.status === 'responded' ? '#4caf50' : '#2196f3'
                }}>
                  {selectedContact.status.toUpperCase()}
                </div>
              </div>

              <div className="detail-content">
                <div className="detail-field">
                  <label>Type:</label>
                  <span>{selectedContact.type}</span>
                </div>
                <div className="detail-field">
                  <label>Subject:</label>
                  <span>{selectedContact.subject}</span>
                </div>
                <div className="detail-field">
                  <label>Message:</label>
                  <p className="detail-message">{selectedContact.message}</p>
                </div>

                {selectedContact.notes && (
                  <div className="detail-field">
                    <label>Admin Notes:</label>
                    <p className="detail-notes">{selectedContact.notes}</p>
                  </div>
                )}

                <div className="detail-field">
                  <label>Date Received:</label>
                  <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="detail-actions">
                {selectedContact.status === 'new' && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => handleMarkAsRead(selectedContact._id)}
                  >
                    ✓ Mark as Read
                  </button>
                )}
                <button 
                  className="delete-contact-btn"
                  onClick={() => handleDeleteContact(selectedContact._id)}
                >
                  🗑️ Delete
                </button>
              </div>

              <div className="notes-section">
                <h4>Add Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this inquiry..."
                  rows={4}
                />
                <button 
                  className="save-notes-btn"
                  onClick={() => handleAddNotes(selectedContact._id)}
                >
                  💾 Save Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>👈 Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageContacts;
