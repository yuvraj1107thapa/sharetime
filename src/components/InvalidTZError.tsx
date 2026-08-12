type Props = {
  displayTZ: string
}

export default function InvalidTZError ({ displayTZ }: Props) {
  return (
    <div className="has-text-centered">
      <div className="is-size-5">
        <span className="has-text-danger has-text-weight-bold">{displayTZ}</span>
        {' '}is not a valid timezone 😵
      </div>
      <br />
      <div>Please try again</div>
    </div>
  )
}
