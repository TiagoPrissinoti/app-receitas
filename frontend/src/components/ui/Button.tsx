import './button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', ...props }: Props) {
  return (
    <button className={`btn ${variant}`} {...props} />
  )
}
