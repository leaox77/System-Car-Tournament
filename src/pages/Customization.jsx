import React from 'react';

const Customization = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Theme Customization</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-light mb-4">Color Scheme</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-light mb-2">Primary Color</label>
              <input type="color" className="w-full h-10 rounded" value="#880d1e" readOnly />
            </div>
            <div>
              <label className="block text-light mb-2">Secondary Color</label>
              <input type="color" className="w-full h-10 rounded" value="#dd2d4a" readOnly />
            </div>
            <div>
              <label className="block text-light mb-2">Accent Color</label>
              <input type="color" className="w-full h-10 rounded" value="#ffd23f" readOnly />
            </div>
          </div>
        </div>
        <div className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-light mb-4">Theme Preview</h2>
          <div className="space-y-4">
            <div className="bg-dark p-4 rounded">
              <p className="text-white">Sample Text</p>
              <button className="bg-primary text-white px-4 py-2 rounded mt-2">Sample Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;