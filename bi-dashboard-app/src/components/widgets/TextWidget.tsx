import React from 'react';
import type { Widget } from '../../types/dashboard';
import BaseWidget from './BaseWidget';

interface TextWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onConfigure?: (id: string) => void;
}

const TextWidget: React.FC<TextWidgetProps> = ({ widget, onDelete, onConfigure }) => {
  const defaultText = `
# Welcome to Your Dashboard

This is a **text widget** where you can add custom content using Markdown formatting.

## Features:
- Rich text formatting
- Lists and tables
- Links and images
- Custom HTML if needed

*Click the settings icon to edit this content.*
  `.trim();

  const text = widget.data?.content || defaultText;

  return (
    <BaseWidget widget={widget} onDelete={onDelete} onConfigure={onConfigure}>
      <div className="h-full overflow-auto prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {text.split('\n').map((line: string, index: number) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={index} className="text-xl font-bold mb-2 text-gray-900">
                  {line.substring(2)}
                </h1>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="text-lg font-semibold mb-2 text-gray-800">
                  {line.substring(3)}
                </h2>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>{line.substring(2)}</span>
                </div>
              );
            }
            if (line.includes('**') && line.includes('**')) {
              const parts = line.split('**');
              return (
                <p key={index} className="mb-2">
                  {parts.map((part: string, i: number) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </p>
              );
            }
            if (line.includes('*') && line.includes('*') && !line.includes('**')) {
              const parts = line.split('*');
              return (
                <p key={index} className="mb-2">
                  {parts.map((part: string, i: number) => 
                    i % 2 === 1 ? <em key={i}>{part}</em> : part
                  )}
                </p>
              );
            }
            if (line.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
    </BaseWidget>
  );
};

export default TextWidget;