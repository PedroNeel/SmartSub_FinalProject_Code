from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    # Use environment variable for port with fallback
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_DEBUG', 'True') == 'True')