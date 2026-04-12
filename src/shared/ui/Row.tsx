export const Row = ({ children }) => (
  <div style={{
     display: 'flex', 
     gap: 32, 
     alignItems: 'center',
     justifyContent: 'center',
     }}>
    {children}
  </div>
)