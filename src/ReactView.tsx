import { Tab, TabGroup, TabList, TabPanel, TabPanels,Select} from '@headlessui/react'



export const ReactView = () => {
  return (
    <div>
    <TabGroup >
      <TabList className="grid grid-cols-3 gap-4">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
            <ul><li>test</li><li><a href="click me">click me</a></li></ul>
        </TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
    <Select name="status" aria-label="Project status">
      <option value="active">Active</option>
      <option value="paused">Paused</option>
      <option value="delayed">Delayed</option>
      <option value="canceled">Canceled</option>
    </Select>
    </div>
  );
};



