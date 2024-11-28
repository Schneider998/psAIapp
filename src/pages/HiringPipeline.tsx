import React, { useState, useEffect, memo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useStore } from '../data/store';
import { useNavigate } from 'react-router-dom';

const PipelineCard = memo(({ candidate }: { candidate: any }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag interference
    navigate(`/profile/${candidate.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-500">{candidate.currentRole}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-primary-50 text-primary-700 text-sm px-2 py-1 rounded-full">
            {candidate.score}%
          </span>
          <button
            onClick={handleProfileClick}
            className="p-1 text-gray-400 hover:text-primary-500 transition-colors"
            title="View Profile"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          {candidate.revenueSold} Revenue
        </div>
        <div className="text-gray-500">
          {candidate.avgDealSize} Avg Deal
        </div>
      </div>

      {(candidate.status === 'accepted' || candidate.status === 'rejected') && (
        <div className={`mt-3 text-sm flex items-center justify-end ${
          candidate.status === 'accepted' ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-opacity-10 flex items-center gap-1"
            style={{ 
              backgroundColor: candidate.status === 'accepted' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)'
            }}
          >
            {candidate.actionBy === 'client' ? 'By You' : 'By Candidate'}
          </span>
        </div>
      )}
    </div>
  );
});

PipelineCard.displayName = 'PipelineCard';

const DroppableColumn = memo(({ column, children }: { column: any; children: React.ReactNode }) => (
  <div className="flex flex-col bg-gray-50 rounded-lg p-4">
    <h2 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
      {column.title}
      <span className="bg-gray-200 text-gray-700 text-sm py-1 px-2 rounded-full">
        {column.candidates.length}
      </span>
    </h2>
    
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-1 overflow-y-auto space-y-3"
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
));

DroppableColumn.displayName = 'DroppableColumn';

const DraggableCard = memo(({ candidate, index }: { candidate: any; index: number }) => (
  <Draggable draggableId={candidate.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <PipelineCard candidate={candidate} />
      </div>
    )}
  </Draggable>
));

DraggableCard.displayName = 'DraggableCard';

export default function HiringPipeline() {
  const { candidates, updateCandidateStatus } = useStore();
  const [columns, setColumns] = useState({
    invited: {
      id: 'invited',
      title: 'Invited',
      candidates: []
    },
    accepted: {
      id: 'accepted',
      title: 'Accepted',
      candidates: []
    },
    rejected: {
      id: 'rejected',
      title: 'Rejected',
      candidates: []
    },
    hired: {
      id: 'hired',
      title: 'Hired',
      candidates: []
    }
  });

  useEffect(() => {
    const updatedColumns = {
      invited: {
        ...columns.invited,
        candidates: candidates.filter(c => c.status === 'pending')
      },
      accepted: {
        ...columns.accepted,
        candidates: candidates.filter(c => c.status === 'accepted')
      },
      rejected: {
        ...columns.rejected,
        candidates: candidates.filter(c => c.status === 'rejected')
      },
      hired: {
        ...columns.hired,
        candidates: candidates.filter(c => c.status === 'hired')
      }
    };
    setColumns(updatedColumns);
  }, [candidates]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateCandidateStatus(draggableId, destination.droppableId as any);
  };

  const pendingReviewCandidates = candidates.filter(c => c.status === 'applied');

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
          Hiring Pipeline
        </h1>
      </div>

      {pendingReviewCandidates.length > 0 && (
        <div className="mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                New Applications ({pendingReviewCandidates.length})
              </h2>
            </div>
            <div className="space-y-4">
              {pendingReviewCandidates.map(candidate => (
                <PipelineCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
          {Object.values(columns).map((column) => (
            <DroppableColumn key={column.id} column={column}>
              {column.candidates.map((candidate, index) => (
                <DraggableCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                />
              ))}
            </DroppableColumn>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}