import React from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
} from 'devextreme-react/pie-chart';

const Pie = ({ chartData }) => {
  const createData = () => {
    let pieData = [{
      severity: "Low",
      count: chartData.filter(item => item.severity ==="low")?.length || 0
    },{
      severity: "Medium",
      count: chartData.filter(item => item.severity ==="medium")?.length || 0
    },{
      severity: "High",
      count: chartData.filter(item => item.severity ==="high")?.length || 0
    },{
      severity: "Critical",
      count: chartData.filter(item => item.severity ==="critical")?.length || 0
    }];
    return pieData;
  }

   const onCountClickHandler = (e) => {
    onToggleVisibility(e.target);
  }

  const onLegendClickHandler = (e) => {
    const arg = e.target;
    const item = e.component.getAllSeries()[0]?.getPointsByArg(arg)[0];
    onToggleVisibility(item);
  }

  const onToggleVisibility = (item) => {
    return item.isVisible() ? item.hide() : item.show();
  }

  return (
     <PieChart
        id="pie"
        dataSource={createData()}
        palette="Bright"
        title="Group Findings by Severity"
        onPointClick={onCountClickHandler}
        onLegendClick={onLegendClickHandler}
      >
        <Series
          argumentField="severity"
          valueField="count"
        >
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>
        <Size width={700} />
      </PieChart>
  );
};

export default Pie;
