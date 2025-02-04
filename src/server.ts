import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { ReportRoute } from './routes/report.route';

ValidateEnv();

const app = new App([new ReportRoute()]);

app.listen();
