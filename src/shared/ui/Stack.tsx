export const Stack = ({ children }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12 
    }}
    >
    {children}
  </div>
)