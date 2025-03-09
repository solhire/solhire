'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SkillsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxSkills?: number;
}

export default function SkillsInput({
  value = [],
  onChange,
  maxSkills = 10
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const skill = inputValue.trim();
    
    if (!skill) return;
    if (value.includes(skill)) {
      setInputValue('');
      return;
    }
    if (value.length >= maxSkills) return;

    onChange([...value, skill]);
    setInputValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill}</span>
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addSkill}
          placeholder={value.length >= maxSkills ? `Maximum ${maxSkills} skills reached` : "Type a skill and press Enter"}
          disabled={value.length >= maxSkills}
          className="flex-1"
        />
      </div>
      
      <p className="text-xs text-gray-500">
        {value.length} of {maxSkills} skills added
      </p>
    </div>
  );
} 