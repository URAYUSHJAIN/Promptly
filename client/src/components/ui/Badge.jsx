export default function Badge({ children, dotColor = 'var(--lp-acc)', style = {} }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'var(--lp-muted)',
        fontWeight: 500,
        ...style,
      }}
    >
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: dotColor,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
