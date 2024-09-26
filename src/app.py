from flask import Flask, request, jsonify
import joblib
import pandas as pd


app = Flask(__name__)

model = joblib.load('model/mlr_model_new.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    selected_date = request.json.get('date')

    selected_date = pd.to_datetime(selected_date)

    week_number = selected_date.isocalendar()[1]

    population_values = {
        'Colombo' : 648034,
        'Dehiwala': 219827,
        'Homagama': 34664,
        'Kottawa': 10464,
        'Maharagama': 66576,
        'Moratuwa': 185031,
        'Pita Kotte': 118179,
    }

    input_data = {
        'Population': [population_values['Colombo'],population_values['Dehiwala'], population_values['Homagama'],
                       population_values['Kottawa'], population_values['Maharagama'],
                       population_values['Moratuwa'], population_values['Pita Kotte']],
        'Week_Number': [week_number] * 7,
        'City_Colombo': [1, 0, 0, 0, 0, 0, 0],               
        'City_Dehiwala': [0, 1, 0, 0, 0, 0, 0],
        'City_Homagama': [0, 0, 1, 0, 0, 0, 0],
        'City_Kottawa': [0, 0, 0, 1, 0, 0, 0],
        'City_Maharagama': [0, 0, 0, 0, 1, 0, 0],
        'City_Moratuwa': [0, 0, 0, 0, 0, 1, 0],
        'City_Pita Kotte': [0, 0, 0, 0, 0, 0, 1],
    }
    
    input_df = pd.DataFrame(input_data)

    # Make predictions
    predictions = model.predict(input_df)

    # Prepare results
    cities = ['Colombo', 'Dehiwala', 'Homagama', 'Kottawa', 'Maharagama', 'Moratuwa', 'Pita Kotte']
    result_df = pd.DataFrame({
        'City': cities,
        'Predicted_Disposed_Amount': predictions
    })

    # Sort results and add ranking
    sorted_results = result_df.sort_values(by='Predicted_Disposed_Amount', ascending=False)
    sorted_results['Rank'] = range(1, len(sorted_results) + 1)

    return jsonify(sorted_results.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(port=5000)