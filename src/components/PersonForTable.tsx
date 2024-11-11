import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonForTable: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug ? personSlug : '';

  function findParentLink(name: string | null) {
    if (name === null) {
      return '-';
    }

    const parent = people.find(p => p.name === name);

    return parent?.slug;
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {' '}
        {findParentLink(person.motherName) ? (
          <Link
            to={`../${findParentLink(person.motherName)}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName
        )}
      </td>

      <td>
        {findParentLink(person.fatherName) ? (
          <Link to={`../${findParentLink(person.fatherName)}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName
        )}
      </td>
    </tr>
  );
};
