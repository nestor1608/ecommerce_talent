import { useState, useEffect } from 'react';
import { aboutApi } from '../../api/aboutApi';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader } from '../../components/common/Loader';
import './AdminAbout.css';

const AdminAbout = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        mission: '',
        vision: '',
        values: [{ title: '', description: '' }],
    });

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            setLoading(true);
            const data = await aboutApi.getAbout();
            setFormData(data);
        } catch (error) {
            console.error('Error fetching about:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleValueChange = (index, field, value) => {
        const newValues = [...formData.values];
        newValues[index][field] = value;
        setFormData({ ...formData, values: newValues });
    };

    const addValue = () => {
        setFormData({
            ...formData,
            values: [...formData.values, { title: '', description: '' }],
        });
    };

    const removeValue = (index) => {
        const newValues = formData.values.filter((_, i) => i !== index);
        setFormData({ ...formData, values: newValues });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await aboutApi.updateAbout(formData);
            alert('About Us content updated successfully!');
        } catch (error) {
            alert('Error updating content: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="admin-about">
            <div className="admin-header">
                <h1>Edit About Us Page</h1>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="about-form">
                    <Input
                        label="Page Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="form-group">
                        <label>Main Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows="5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mission Statement</label>
                        <textarea
                            name="mission"
                            value={formData.mission}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Vision Statement</label>
                        <textarea
                            name="vision"
                            value={formData.vision}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="values-section">
                        <h3>Company Values</h3>
                        {formData.values.map((value, index) => (
                            <Card key={index} className="value-item">
                                <div className="value-header">
                                    <h4>Value #{index + 1}</h4>
                                    {formData.values.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeValue(index)}
                                            className="btn-remove"
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>
                                <Input
                                    label="Value Title"
                                    value={value.title}
                                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                                    required
                                />
                                <div className="form-group">
                                    <label>Value Description</label>
                                    <textarea
                                        value={value.description}
                                        onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                                        rows="2"
                                        required
                                    />
                                </div>
                            </Card>
                        ))}
                        <button type="button" onClick={addValue} className="btn-add-value">
                            + Add Value
                        </button>
                    </div>

                    <div className="form-actions">
                        <Button type="submit" size="large" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AdminAbout;
