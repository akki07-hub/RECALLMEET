'use client';

import { useState, useRef } from 'react';
import { Upload, FileAudio, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  selectedFile?: File | null;
  className?: string;
}

export function AudioUploader({ onFileSelect, onClear, selectedFile, className }: AudioUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className={className}>
      {selectedFile ? (
        <div className="flex items-center justify-between p-4 bg-indigo-950/50 border border-indigo-500/40 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <FileAudio className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
            isDragging
              ? 'border-indigo-400 bg-indigo-950/40'
              : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
          )}
        >
          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-300">Drop audio file here or click to browse</p>
          <p className="text-xs text-gray-500 mt-1">MP3, MP4, M4A, WAV, WebM — max 25MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".mp3,.mp4,.m4a,.wav,.webm,.ogg"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileSelect(f);
            }}
          />
        </div>
      )}
    </div>
  );
}
