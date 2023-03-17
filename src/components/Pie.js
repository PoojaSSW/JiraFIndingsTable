import React from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Title,
  Subtitle,
  Tooltip
} from 'devextreme-react/pie-chart';
import "../App.css";
const Pie = ({ chartData, onClickPieChartData }) => {
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
    onClickPieChartData(e.target.argument?.toLowerCase(), e.target.isVisible());
    onToggleVisibility(e.target);
  }

  const onLegendClickHandler = (e) => {
    const arg = e.target;
    const item = e.component.getAllSeries()[0]?.getPointsByArg(arg)[0];
    onClickPieChartData(arg.toLowerCase(), item.isVisible());
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
        onPointClick={onCountClickHandler}
        onLegendClick={onLegendClickHandler}
      >
        <Title text="Group Findings by Severity">
          <Subtitle text="Select a section or a legend to filter data based on Severity from the table below!"/>
        </Title>
        <Tooltip enabled={true}/>
        <Series
          argumentField="severity"
          valueField="count">
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>
        <Size width={700} />
      </PieChart>
  );
};

export default Pie;
