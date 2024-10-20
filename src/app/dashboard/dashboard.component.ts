import { Component, OnInit } from '@angular/core';
import { EvtService } from 'src/services/evt.service';
import { MemberService } from 'src/services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Nb_members: number = 0;
  Nb_events: number = 0;
  Nb_tools: number = 0;
  Nb_articles: number = 0;
  Nb_students: number = 0; 
  Nb_teacher: number = 0; 

  chartData: ChartDataset[] = [
    {
      label: 'Distribution du nombre de teachers et students',
      data: [this.Nb_teacher, this.Nb_students]
    }
  ];

  chartLabels: string[] = ['NbTeachers', 'NbStudents'];

  chartOptions: ChartOptions = {
    responsive: true,
    // Add additional options as needed
  };

  constructor(
    private memberService: MemberService,
    private evtService: EvtService,
   
  ) {}

  ngOnInit(): void {
    this.loadMemberData();
   
  }

  loadMemberData(): void {
    this.memberService.getAllMembers().subscribe(
      (data) => {
        this.Nb_members = data.length;
        this.Nb_students = data.filter(member => member.type === 'Student').length;
        this.Nb_teacher = data.filter(member => member.type === 'teacher').length;

        // Update chart data
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }



  updateChartData(): void {
    this.chartData[0].data = [this.Nb_teacher, this.Nb_students];
  }
}
