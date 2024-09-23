import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="relative">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>X</button>
        <img src={imageUrl} alt="Full view" className="max-w-full max-h-screen" />
        <div className="flex justify-between mt-4">
          <button className="text-white" onClick={onPrev}>Back</button>
          <button className="text-white" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
