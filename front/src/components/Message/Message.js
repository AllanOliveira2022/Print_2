function Message({ type, message }) {
  const baseClasses = 'p-4 mb-6 border-l-4 text-sm font-semibold';

  const typeClasses = {
    success: 'bg-green-100 text-green-600 border-green-600',
    error: 'bg-red-100 text-red-600  border-red-600',
    loading: 'bg-blue-100 text-blue-600  border-blue-600',
  };

  return (
    <div 
      className={`${baseClasses} ${typeClasses[type] || ''}`} 
      role="alert"
    >
      {message}
    </div>
  );
}

export default Message;