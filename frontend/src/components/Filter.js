import { Tab, Tabs } from 'react-bootstrap'

const Filter = ({ services, category, setCategory }) => {
  return (
    <>
      <Tabs
        className="my-2 flex-nowrap overflow-auto"
        activeKey={category}
        onSelect={(key) => setCategory(key)}
      >
        {services.map((service) => (
          <Tab
            title={service}
            eventKey={service}
            style={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>
      <div className="my-2">Distance</div>
    </>
  )
}

export default Filter
