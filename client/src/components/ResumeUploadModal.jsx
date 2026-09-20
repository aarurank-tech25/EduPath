import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function ResumeUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      selectFile(e.target.files[0]);
    }
  };

  const selectFile = (selected) => {
    setError(null);
    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF document (.pdf).');
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      setUploadStep('Extracting text from PDF via buffer parser...');
      await new Promise(r => setTimeout(r, 400));
      
      setUploadStep('AI analyzing technical skills & experiences...');
      const res = await api.uploadResume(file);

      setUploadStep('Skill gaps updated & Learning Plan dynamically adapted!');
      await new Promise(r => setTimeout(r, 400));

      setResult(res);
      setUploading(false);
      if (onUploadSuccess) onUploadSuccess(res);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'Failed to parse resume PDF.');
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    setResult(null);
    setUploading(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title-group">
            <UploadCloud size={22} className="text-cyan" />
            <div>
              <h3>AI Resume Skill Extractor</h3>
              <p className="modal-subtitle">Upload your PDF resume to analyze skills and recalculate gaps</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="alert-box error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {!result ? (
            <>
              <div 
                className={`dropzone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="application/pdf" 
                  style={{ display: 'none' }}
                  onChange={handleChange}
                />

                {file ? (
                  <div className="file-preview">
                    <FileText size={40} className="text-indigo" />
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{(file.size / 1024).toFixed(1)} KB</div>
                    <span className="file-change-hint">Click or drag to choose another file</span>
                  </div>
                ) : (
                  <div className="dropzone-prompt">
                    <UploadCloud size={48} className="dropzone-icon" />
                    <h4>Drag & Drop your Resume PDF here</h4>
                    <p>or click to browse from your computer</p>
                    <span className="file-format-badge">Supported format: PDF</span>
                  </div>
                )}
              </div>

              {uploading && (
                <div className="upload-progress-container">
                  <div className="progress-spinner-row">
                    <Loader2 size={20} className="animate-spin text-cyan" />
                    <span className="step-text">{uploadStep}</span>
                  </div>
                  <div className="animated-progress-bar">
                    <div className="progress-bar-fill indeterminate"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="upload-result-view">
              <div className="success-banner">
                <CheckCircle2 size={32} className="text-emerald" />
                <div>
                  <h4>Resume Processed Successfully!</h4>
                  <p>Extracted {result.detectedSkills?.length || 0} technical skills from "{result.filename}"</p>
                </div>
              </div>

              <div className="detected-skills-section">
                <div className="section-label">Newly Verified & Detected Skills:</div>
                <div className="skills-badge-wrap">
                  {(result.detectedSkills || []).map((s, idx) => (
                    <span key={idx} className="detected-skill-badge">
                      <Sparkles size={12} className="text-cyan" />
                      <span>{s.name}</span>
                      <span className="proficiency-pill">{s.proficiency}%</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="adaptation-notice">
                <Sparkles size={16} className="text-amber" />
                <span>
                  <strong>Autonomous Agent Hook:</strong> Skill Gaps re-evaluated and 6-week Learning Plan automatically re-adapted for your target role!
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {!result ? (
            <>
              <button className="btn-secondary" onClick={handleClose} disabled={uploading}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleUpload} 
                disabled={!file || uploading}
              >
                {uploading ? 'Analyzing...' : 'Parse & Update Profile'}
              </button>
            </>
          ) : (
            <button className="btn-primary full-width" onClick={handleClose}>
              Done & View Updated Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
