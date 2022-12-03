import { useEffect, useState } from 'react'
import { Tab, Tabs, Form } from 'react-bootstrap'

const Filter = ({
  services,
  category,
  setCategory,
  ranges,
  maxDistance,
  setMaxDistance,
}) => {
  const [rangeIndex, setRangeIndex] = useState(3)

  const updateRange = (e) => {
    setRangeIndex(e.target.value)
  }

  useEffect(() => {
    setMaxDistance(ranges[rangeIndex])
  }, [rangeIndex, setMaxDistance, ranges])

  return (
    <>
      <Tabs
        className="my-2 flex-nowrap overflow-auto"
        activeKey={category}
        onSelect={(key) => setCategory(key)}
      >
        {services.map((service) => (
          <Tab
            key={service}
            title={service}
            eventKey={service}
            style={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <div className="text-center mx-auto" style={{ width: '250px' }}>
        Range: {maxDistance} KM
        <Form.Range
          min={0}
          max={ranges.length - 1}
          step={1}
          value={rangeIndex}
          onChange={(e) => updateRange(e)}
        ></Form.Range>
      </div>
    </>
  )
}

export default Filter
