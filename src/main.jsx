import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';
import Credits from './Credits';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className='scale-[0.8]'>
			<App />
		</div>

		<Credits />
	</React.StrictMode>,
);
