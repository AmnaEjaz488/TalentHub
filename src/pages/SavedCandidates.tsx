import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Adjusted the path to match the correct casing
import { searchGithub } from '../api/API'; // Adjusted the import path to the correct location
import '../index.css'; // Import the CSS file

const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await searchGithub();
                console.log('Fetched candidates:', data); // Debugging
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const saveCandidate = () => {
        const candidate = candidates[currentIndex];
        if (candidate) {
            setSavedCandidates((prev) => {
                const updated = [...prev, candidate];
                console.log('Updated saved candidates:', updated); // Debugging
                return updated;
            });
            nextCandidate();
        }
    };

    const nextCandidate = () => {
        console.log('Next button clicked');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
    };

    const previousCandidate = () => {
        console.log('Previous button clicked');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + candidates.length) % candidates.length);
    };

    const currentCandidate = candidates[currentIndex] || null;

    if (loading) {
        return <div>Loading candidates...</div>;
    }

    if (!currentCandidate) {
        return <div className="no-candidates">No candidates available to review.</div>;
    }

    console.log('Candidates:', candidates);
    console.log('Current Index:', currentIndex);
    console.log('Saved Candidates:', savedCandidates);

    return (
        <div className="candidate-search">
            <h2>Candidate Search</h2>
            <div className="candidate-info">
                <img src={currentCandidate.avatar} alt={currentCandidate.name} />
                <div>
                    <h3>{currentCandidate.name}</h3>
                    <p>Username: {currentCandidate.username}</p>
                    <p>Location: {currentCandidate.location}</p>
                    <p>Email: {currentCandidate.email}</p>
                    <p>Company: {currentCandidate.company}</p>
                    <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
                </div>
            </div>
            <div className="buttons">
                <button onClick={saveCandidate}>+</button>
                <button onClick={previousCandidate}>Previous</button>
                <button onClick={nextCandidate}>Next</button>
            </div>
            {savedCandidates.length === 0 && <p className="no-candidates">No candidates have been accepted.</p>}
        </div>
    );
};

export default CandidateSearch;