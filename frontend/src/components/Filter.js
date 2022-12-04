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
          max={100}
          step={1}
          value={maxDistance}
          onChange={(e) => setMaxDistance(e.target.value)}
        />
      </div>
    </>
  )
}

export default Filter
